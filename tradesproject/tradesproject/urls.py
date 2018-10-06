"""tradesproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from tradesapp.views import Home
from tradesapp.api import UserRegistrationAPIView, UserLoginAPIView, ChangePasswordView, UserLogoutAPIView, TraderAPIView, ConsumerAPIView, TraderStockInfoAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Home.as_view(), name='home'),

    path('api/v1/register/', UserRegistrationAPIView.as_view(), name='api-register'),
    path('api/v1/login/', UserLoginAPIView.as_view(), name='api-login'),
    path('api/v1/changepassword/', ChangePasswordView.as_view(), name='api-chngpwd'),
    path('api/v1/logout/', UserLogoutAPIView.as_view(), name='api-logout'),
    path('api/v1/traders/', TraderAPIView.as_view(), name='api-traders'),
    path('api/v1/additemtostock/', TraderStockInfoAPIView.as_view(), name='api-additemtostock'),
    path('api/v1/getavailablestock/', TraderStockInfoAPIView.as_view(), name='api-getavailablestocks'),
    # path('api/v1/createshop/', CreateShopAPIView.as_view(), name='api-createshop'),
    path('api/v1/consumers/', ConsumerAPIView.as_view(), name='api-consumers'),
]
