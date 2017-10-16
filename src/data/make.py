import numpy as np
import json
import math
import random
import csv
from arrays import *
import binascii
import os
import geohash

## Controls
THINNING_THRESHOLD = 0.01
PROPOSAL_RATIO = 0.3
SUBTOKEN_THRESHOLD = 0.2

PROPOSAL_BLUE = [47, 128, 237]
ACTIVE_GREEN = [39, 174, 96]

## Output Dict Model
outputData = []
token = {}

fields = ['LON','LAT','NUMBER','STREET','UNIT','CITY','DISTRICT','REGION','POSTCODE','ID','HASH']

def cscStatus( rand ):
    if rand > PROPOSAL_RATIO:
        return 'STATUS_PROPOSAL'
    else:
        return 'STATUS_ACTIVE'

def randomInArr( arr ):
    return arr[int(random.uniform(0, len(arr)))]

def generateSubTokens(threshold):
    r = random.uniform(0, 1)
    if r < threshold:
        return random.randint(0, 25)
    else:
        return 0

with open('city_of_new_york.csv', 'rb') as csvfile:
    nycAddresses = csv.DictReader(csvfile, fieldnames=fields, delimiter=',', quotechar='"')
    print 'STARTED'
    for row in nycAddresses:
        if row['POSTCODE'] in manhattanZips and random.uniform(0, 1) < THINNING_THRESHOLD:
            lat = float(row['LAT'])
            lon = float(row['LON'])
            status = cscStatus( random.uniform(0, 1) )
            ## Ethereum address
            token["ethereumAddress"]    = '0x' + str(binascii.hexlify(os.urandom(32)))
            ## LON, LAT
            token["position"]           = [lon, lat]
            ## Geohash from latlon
            token['geohash']            = geohash.encode(lat, lon)
            ## Beacon given name
            token["title"]              = randomInArr(tokenTitles)
            ## Physical location street address
            token["address"]            = row['NUMBER'] + ' ' + row['STREET'].title()
            ## CSC status
            token["status"]             = status
            ## Number of sub-tokens
            token["subTokens"]          = generateSubTokens(SUBTOKEN_THRESHOLD)
            ## Token balance
            token["balance"]            = float(str(random.uniform(0, 1000))[:4]) ##lol what da hell
            ## how popular (views), normalized
            token["popularity"]         = random.uniform(0, 1)
            ## yep
            token["category"]           = randomInArr(tokenCategories)
            ## color for dumb deck.gl
            # token ["color"]             = PROPOSAL_BLUE if status is 'STATUS_PROPOSAL' else ACTIVE_GREEN
            ## radius
            # token["radius"]             = 1

            outputData.append(token.copy())


print 'DONE', len(outputData)
with open('data.json', 'wb') as outfile:
    json.dump(outputData, outfile)
