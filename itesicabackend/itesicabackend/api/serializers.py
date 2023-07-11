from rest_framework import serializers
from .models import Note, NoteHistory


class NoteSerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Note
        fields = [
            "id",
            "title",
            "created_date",
            "edit_date",
            "user",
            "content",
            "parent",
            "children",
            "marked",
            "color",
        ]


class NoteHistorySerializer(serializers.ModelSerializer):
    note_title = serializers.ReadOnlyField(source='note.title')

    class Meta:
        model = NoteHistory
        fields = ['id', 'note', 'note_title', 'old_content', 'edited_at']
