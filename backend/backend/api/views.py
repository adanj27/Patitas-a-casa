from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse
from rest_framework import permissions
from . import utilities
from . import models

class HtmlToImage(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        
        html = request.GET.get('html')
        css = request.GET.get('css')
        
        if html != None:
            filename = utilities.get_file_name(html,css) + '.png'
            utilities.screenshoot(filename, html, css)
            utilities.remove_file(filename)
            return FileResponse(open(filename, 'rb'), content_type='image/png')
            
        return Response({
            'success': False,
        })
   