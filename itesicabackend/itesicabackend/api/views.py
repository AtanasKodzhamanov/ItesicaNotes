from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Note
from .serializers import NoteSerializer


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth.models import User

from rest_framework import status


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(username=username, password=password)
    user.save()

    return Response(
        {"success": "User registered successfully"}, status=status.HTTP_201_CREATED
    )


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print("CustomObtainAuthToken post method called")
        response = super(CustomObtainAuthToken, self).post(
            request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])
        user_id = token.user_id
        print("user_id:", user_id)
        response.data["user_id"] = user_id
        return response


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
