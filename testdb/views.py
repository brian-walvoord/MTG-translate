from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
import pip._vendor.requests as requests
from .models import TranslatedCards

# # Create your views here.


def index(request):
    return render(request, 'index.html')

#     # use response.json()["key"] to access specific content
#     return HttpResponse(response)


def randomness(request):
    response = requests.get('https://api.scryfall.com/cards/random')
    return HttpResponse(response, status=200)


def load_db_data(request):
    db_data = serializers.serialize("json", TranslatedCards.objects.all())
    return JsonResponse(db_data, safe=False, status=200)


def search(request):
    query = request.GET.get("query")
    response = requests.get(f"https://api.scryfall.com/cards/search?q={query}")
    return HttpResponse(response, status=200)


def translate(request):
    match request.method:
        case 'POST':
            set = request.GET.get("set")
            collector = request.GET.get("collector")
            response = requests.get(
                f"https://api.scryfall.com/cards/{set}/{collector}/ja")
            if response.status_code == 200:
                tran_cards = TranslatedCards()
                tran_cards.url = response.json()['image_uris']['normal']
                tran_cards.save()
                return HttpResponse(response, status=200)
            else:
                return HttpResponse(status=404)


def remove(request):
    match request.method:
        case 'DELETE':
            url = request.GET.get("url")
            rem = TranslatedCards.objects.get(url=url)
            rem.delete()
            return HttpResponse(status=200)
