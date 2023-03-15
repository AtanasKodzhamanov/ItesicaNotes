from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'created_date', 'edit_date',
                  'user', 'content', 'parent', 'children']
