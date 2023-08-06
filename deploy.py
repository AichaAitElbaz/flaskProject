# app.py
from flask import Flask, render_template, request, jsonify
import pickle
import sklearn

app = Flask(__name__)

model = pickle.load(open('classification_model.sav', 'rb'))
regr_model = pickle.load(open('regression_model.sav', 'rb'))

@app.route('/')
def home():
    result = ''
    return render_template('App.jsx', **locals())


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    inputs = [
        data['latitude'], data['longitude'], data['annee'], data['mois'], data['P'], data['T'],
        data['Tmax'], data['Tmin'], data['PET'], data['qm'], data['SPI3'], data['SPI6'], data['SPI9'],
        data['SPI12'], data['SPI8'], data['SP24'], data['SP32'], data['SPEI3'], data['SPEI6'],
        data['SPEI9'], data['SPEI12'], data['SPEI8'], data['SPEI24'], data['SPEI32']
    ]
    predicted_class = model.predict([inputs])[0]
    response = {'predicted_class': predicted_class}
    return jsonify(response)

@app.route('/regr', methods=['POST'])
def predict_regr():
    data = request.get_json()
    inputs = [
        data['latitude'], data['longitude'], data['annee'], data['mois'], data['P'], data['T'],
        data['Tmax'], data['Tmin'], data['PET'], data['qm'], data['SPI3'], data['SPI6'], data['SPI9'],
        data['SPI12'], data['SPI8'], data['SP24'], data['SP32'], data['SPEI3'], data['SPEI6'],
        data['SPEI9'], data['SPEI12'], data['SPEI8'], data['SPEI24'], data['SPEI32']
    ]
    prediction= regr_model.predict([inputs])[0] # Convert to int
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(debug=True)