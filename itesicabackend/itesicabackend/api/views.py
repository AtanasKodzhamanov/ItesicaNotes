from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Note
from .serializers import NoteSerializer


class HelloView(APIView):
    def get(self, request):
        data = {'message': 'Hello, world!'}
        return Response(data)


class NoteList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
