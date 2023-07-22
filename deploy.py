# app.py
from flask import Flask, render_template, request, jsonify,redirect, url_for
import pickle
import sklearn
import pandas as pd
from flask_wtf.csrf import CSRFProtect, generate_csrf

from io import BytesIO
app = Flask(__name__)
csrf = CSRFProtect(app)


model = pickle.load(open('classificaion_model.sav', 'rb'))


@app.route('/get_csrf_token', methods=['GET'])
def get_csrf_token():
    csrf_token = generate_csrf()
    return jsonify({'csrf_token': csrf_token})


@app.route('/')
def home():
    result = ''
    return render_template('App.jsx', **locals())

def your_prediction_function(input_data):
    # Replace this with your actual prediction logic using your model
    prediction = model.predict([input_data])[0]
    return prediction

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    inputs = [
        data['latitude'], data['longitude'], data['annee'], data['mois'], data['P'], data['T'],
        data['Tmax'], data['Tmin'], data['PET'], data['qm'], data['SPI3'], data['SPI6'], data['SPI9'],
        data['SPI12'], data['SPI8'], data['SP24'], data['SP32'], data['SPEI3'], data['SPEI6'],
        data['SPEI9'], data['SPEI12'], data['SPEI8'], data['SPEI24'], data['SPEI32'], data['SDAT']
    ]
    predicted_class = int(model.predict([inputs])[0])  # Convert to int
    response = {'predicted_class': predicted_class}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
