from rest_framework.routers import DefaultRouter
from django.urls import path, include
from inventory import views

router = DefaultRouter()
router.register(r'products', views.ProductView, basename='products')
router.register(r'products', views.ProductDetailView, basename='product_details')



urlpatterns = [
    path('', include(router.urls)),
    path('category/', views.CategoryView.as_view()),
    path('category/<pk>/', views.categoryDetailView.as_view()),
    path('order/', views.OrderView.as_view()),
    path('order/<pk>/', views.OrderDetailView.as_view()),
    path('customer/', views.CustomerView.as_view()),
    path('customer/<pk>/', views.CustomerDetailView.as_view()),
]
