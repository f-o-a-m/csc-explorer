import numpy as np
import json
import math
import random
import csv

## Controls
THINNING_THRESHOLD = 0.005
PROPOSAL_RATIO = 0.3

## Output Dict Model
model = {
    "name"      :   '',
    "position"  :   [0, 0],
    "elevation" :   0,
}

newDataPoints = []

categories = [
    'Food',
    'Sports',
    'Tech',
    'Agriculture',
    'Cycling',
    'Transportation'
]

tokenTitles = [
    'Take out my Garbage',
    'Mission Chinese 2',
    'Dog Park Renovations',
    'Block Party',
    'Garden Repair',
    'Solar Farm CSA',
    'Parking Share',
    'Bodega Renovations',
    'New Dog Park',
    'Corgi Meetup',
    'Stump Removal',
    'Halloween Parade',
    'CNC Machining Share',
    'Driverless Juno',
    'Drone XSC2E-2'
]

manhattanZips = ['10026', '10027', '10030', '10037', '10039', '10001', '10011', '10018', '10019', '10020', '10036', '10029', '10035', '10010', '10016', '10017', '10022', '10012', '10013', '10014', '10004', '10005', '10006', '10007', '10038', '10280', '10002', '10003', '10009', '10021', '10028', '10044', '10065', '10075', '10128', '10023', '10024', '10025', '10031', '10032', '10033', '10034', '10040']
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
            category    =   randomInArr(categories)
            popularity  =   random.uniform(0, 1)

            newDataPoint = model

            newDataPoint["name"]       =    name
            newDataPoint["position"]   =    [lon, lat]
            newDataPoint["elevation"]  =    elev
            newDataPoint["status"]     =    status
            newDataPoint["balance"]    =    balance
            newDataPoint["title"]      =    title

            newDataPoints.append(newDataPoint.copy())


print 'DONE', len(newDataPoints)
with open('data.json', 'wb') as outfile:
    json.dump(newDataPoints, outfile)
