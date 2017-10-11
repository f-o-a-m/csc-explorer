import numpy as np
import json
import math
import random
import csv
from arrays import *

## Controls
THINNING_THRESHOLD = 0.001
PROPOSAL_RATIO = 0.3

## Output Dict Model
model = {
    "name"      :   '',
    "position"  :   [0, 0],
    "elevation" :   0,
}

newDataPoints = []

fields = ['LON','LAT','NUMBER','STREET','UNIT','CITY','DISTRICT','REGION','POSTCODE','ID','HASH']

def cscStatus( rand ):
    if rand > PROPOSAL_RATIO:
        return 'STATUS_PROPOSAL'
    else:
        return 'STATUS_ACTIVE'

def randomInArr( arr ):
    return arr[int(random.uniform(0, len(arr)))]

with open('city_of_new_york.csv', 'rb') as csvfile:
    nycAddresses = csv.DictReader(csvfile, fieldnames=fields, delimiter=',', quotechar='"')
    print 'STARTED'
    for row in nycAddresses:
        if row['POSTCODE'] in manhattanZips and random.uniform(0, 1) < THINNING_THRESHOLD:
            lat         =   float(row['LAT'])
            lon         =   float(row['LON'])
            name        =   row['NUMBER'] + ' ' + row['STREET'].title()
            elev        =   random.uniform(0, 1)
            title       =   randomInArr(tokenTitles)
            status      =   cscStatus( random.uniform(0, 1) )
            balance     =   float(str(random.uniform(0, 1000))[:4]) ##lol wtf
            category    =   randomInArr(tokenCategories)
            popularity  =   random.uniform(0, 1)

            newDataPoint = model

            newDataPoint["name"]       =    name
            newDataPoint["position"]   =    [lon, lat]
            newDataPoint["elevation"]  =    elev
            newDataPoint["status"]     =    status
            newDataPoint["balance"]    =    balance
            newDataPoint["title"]      =    title
            newDataPoint["popularity"] =    popularity
            newDataPoint["category"]   =    category



            newDataPoints.append(newDataPoint.copy())


print 'DONE', len(newDataPoints)
with open('data.json', 'wb') as outfile:
    json.dump(newDataPoints, outfile)
