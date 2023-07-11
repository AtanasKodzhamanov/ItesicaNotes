from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import NoteList, NoteDetail, CustomObtainAuthToken, NoteHistoryViewSet

router = DefaultRouter()
router.register(r'notehistories', NoteHistoryViewSet)


urlpatterns = [
    path("notes/", NoteList.as_view(), name="note-list"),
    path("notes/<int:pk>/", NoteDetail.as_view(), name="note-detail"),
    path("token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("api-token-auth/", CustomObtainAuthToken.as_view(), name="api_token_auth"),
    path("", include(router.urls)),
]
