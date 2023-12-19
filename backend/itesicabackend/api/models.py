from django.db import models
from django.contrib.auth.models import User

# references to classes that are not yet defined are made by using a string
# so Note is defined as a string
# this is called a lazy reference and Django will resolve it later when it actually needs the Note class


class NoteHistory(models.Model):
    note = models.ForeignKey(
        'Note', on_delete=models.CASCADE, related_name='edit_history')
    old_content = models.TextField(max_length=2500)
    edited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-edited_at']


class Note(models.Model):

    def __str__(self):
        return self.title

    COLORS = (
        ("", "No color"),
        ("white", "White"),
        ("red", "Red"),
        ("blue", "Blue"),
        ("green", "Green"),
        ("yellow", "Yellow"),
        ("orange", "Orange"),
        ("purple", "Purple"),
        ("pink", "Pink"),
        ("grey", "Grey"),
        ("black", "Black"),
    )

    title = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=5000)
    marked = models.BooleanField(default=False)
    color = models.CharField(max_length=255, choices=COLORS, default="")

    # this would create a parent and a children field in the Note model
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children",
    )

    def save(self, *args, **kwargs):
        if self.pk is not None:  # a note can have history only if it has been saved before
            orig = Note.objects.get(pk=self.pk)
            if orig.content != self.content:  # save only if the content has been modified
                NoteHistory.objects.create(note=self, old_content=orig.content)

                # Check if there are more than 10 edits and delete the oldest one
                edit_history = self.edit_history.all()
                if edit_history.count() > 10:
                    edit_history.last().delete()

        super(Note, self).save(*args, **kwargs)
