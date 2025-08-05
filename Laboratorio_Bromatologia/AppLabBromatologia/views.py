
from django.shortcuts import render

def index(request):
    return render(request, 'AppLabBromatologia/index.html')

def sobre(request):
    return render(request, 'AppLabBromatologia/sobre.html')

def contato(request):
    return render(request, 'AppLabBromatologia/contato.html')

def projetos(request):
    return render(request, 'AppLabBromatologia/projetos.html')

def publicacoes(request):
    return render(request, 'AppLabBromatologia/publicacoes.html')

def login_view(request):
    return render(request, 'AppLabBromatologia/login.html')

def admin_page(request):
    return render(request, 'AppLabBrAdmin/AdminPage.html')
