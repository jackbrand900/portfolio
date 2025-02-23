from django.contrib import admin
from .models import Project, Experience, Education, Skill, ContactMessage

admin.site.register(Project)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Skill)
admin.site.register(ContactMessage)