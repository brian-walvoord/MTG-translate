from django.db import models

# This is the table in the DB (Teacher)


class Teacher(models.Model):
    # These are the columns
    name = models.CharField(max_length=80)
    age = models.IntegerField()

# This makes a table in polytest called testdb_myfirsttable with two columns: firstCol, secondCol


class MyFirstTable(models.Model):
    firstCol = models.CharField(max_length=100)
    secondCol = models.IntegerField()


class TranslatedCards(models.Model):
    id = models.BigAutoField(primary_key=True)
    url = models.CharField(max_length=999999)
