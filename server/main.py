from flask import Flask, jsonify, abort
from phonenumbers import parse, is_valid_number
from urllib2 import urlopen
from json import loads, dumps
from flask.ext.cors import CORS
import time

app = Flask(__name__)
CORS(app)

#### Cognalys Config ####
appId = "APP ID HERE"
accessToken = "ACCESS TOKEN HERE"
baseURL = "https://www.cognalys.com/api/v1/otp/"


################################################
####          VERIFICATION ROUTES           ####
################################################
# The first verification step
@app.route('/verify/placeCall/<string:telNumber>', methods=["GET"])
def r_placeCall(telNumber, serverKey):
    if (is_valid_number(parse("+"+str(telNumber)))):
        a = urlopen(baseURL+"?app_id="+appId+"&access_token="+accessToken+"&mobile=+"+str(telNumber)).read()
        return jsonify({"result": a})

# The final verification step
@app.route('/verify/verifyCall/<string:keymatch>/<string:otp>', methods=["GET"])
def r_verifyCall(keymatch, otp):
    if (is_valid_number(parse(str(otp)))):
        a = urlopen(baseURL+"confirm/"+"?app_id="+appId+"&access_token="+accessToken+"&keymatch="+str(keymatch)+"&otp="+str(otp)).read()
        return jsonify({"result": a})
