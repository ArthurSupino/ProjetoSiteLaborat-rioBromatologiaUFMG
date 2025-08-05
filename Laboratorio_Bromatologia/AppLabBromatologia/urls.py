from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),                     # /index/
    path('sobre/', views.sobre, name='sobre'),               # /sobre/
    path('contato/', views.contato, name='contato'),         # /contato/
    path('projetos/', views.projetos, name='projetos'),      # /projetos/
    path('publicacoes/', views.publicacoes, name='publicacoes'),  # /publicacoes/
    path('login/', views.login_view, name='login'),          # /login/
    path('admin-page/', views.admin_page, name='admin_page') # /admin-page/
]
