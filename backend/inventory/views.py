from django.shortcuts import render
from rest_framework import generics, mixins, viewsets
from .models import Product, category, Order, Customer
from .serializers import ProductSerializer, CategorySerializer, OrderSerializer, CustomerSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.


class ProductView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter,filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['name', 'manufacturer',]
    ordering_fields =['name','manufacturer']
    filterset_fields = ['name', 'manufacturer','category']

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ProductDetailView(viewsets.GenericViewSet,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin ):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CategoryView(generics.ListCreateAPIView):

    queryset = category.objects.all()
    serializer_class = CategorySerializer


class categoryDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = category.objects.all()
    serializer_class = CategorySerializer


class OrderView(generics.ListCreateAPIView):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# 
class CustomerView(generics.ListCreateAPIView):

    queryset = Customer.objects.all()
    filter_backends = [filters.SearchFilter,filters.OrderingFilter,]
    search_fields = ['name']
    ordering_fields =['name']
    serializer_class = CustomerSerializer


class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer