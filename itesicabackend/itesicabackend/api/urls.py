from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import HelloView, NoteList, NoteDetail

urlpatterns = [
    path('hello/', HelloView.as_view(), name='hello'),
    path('notes/', NoteList.as_view(), name='note-list'),
    path('notes/<int:pk>/', NoteDetail.as_view(), name='note-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
