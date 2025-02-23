from django.urls import path
from . import views

urlpatterns = [
    path('eductation/create', views.EducationListCreateAPIView.as_view(), name='education-list-select'),
    path('education/get-all', views.EducationListCreateAPIView.as_view(), name='get-education'),
    path('skills/get-all', views.SkillListCreateAPIView.as_view(), name='get-all-skills'),
    path('skills/create', views.SkillListCreateAPIView.as_view(), name='create-skill'),
    path('skills/update/<int:pk>/', views.SkillRetrieveUpdateDestroyAPIView.as_view(), name='update-skill'),
    path('skills/delete/<int:pk>/', views.SkillRetrieveUpdateDestroyAPIView.as_view(), name='delete-skill'),
    path('books-api/get-all', views.BookListCreateAPIView.as_view(), name='book-list-get'),
    path('books-api/create', views.BookListCreateAPIView.as_view(), name='book-create'),
    path('books-api/delete/<int:pk>/', views.BookRetrieveUpdateDestroyAPIView.as_view(), name='book-list-delete'),
    path('get-books', views.get_books, name='get_books'),
    path('add-example/', views.add_example_book, name='add_example_book'),
]