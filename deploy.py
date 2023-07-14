from flask import Flask, render_template, request
import pickle
import sklearn

app = Flask(__name__)

model = pickle.load(open('savedmodel.sav' , 'rb'))

@app.route('/')
def home():
    result = ''
    return render_template('index.html', **locals())


@app.route('/predict' , methods=['POST', 'GET'])
def predict():
    latitude = float(request.form['latitude'])
    longitude = float(request.form['longitude'])
    annee = float(request.form['annee'])
    mois = float(request.form['mois'])
    P = float(request.form['P'])
    T = float(request.form['T'])
    Tmax = float(request.form['Tmax'])
    Tmin = float(request.form['Tmin'])
    PET = float(request.form['PET'])
    qm = float(request.form['qm'])
    SPI3 = float(request.form['SPI3'])
    SPI6 = float(request.form['SPI6'])
    SPI9 = float(request.form['SPI9'])
    SPI12 = float(request.form['SPI12'])
    SPI8 = float(request.form['SPI8'])
    SP24 = float(request.form['SP24'])
    SP32 = float(request.form['SP32'])
    SPEI3 = float(request.form['SPEI3'])
    SPEI6 = float(request.form['SPEI6'])
    SPEI9 = float(request.form['SPEI9'])
    SPEI12 = float(request.form['SPEI12'])
    SPEI8 = float(request.form['SPEI8'])
    SPEI24 = float(request.form['SPEI24'])
    SPEI32 = float(request.form['SPEI32'])
    SDAT = float(request.form['3976_SDAT'])
    result = model.predict([[latitude, longitude, annee, mois, P, T, Tmax, Tmin,
       PET, qm, SPI3, SPI6, SPI9, SPI12, SPI8,
       SP24, SP32, SPEI3, SPEI6, SPEI9, SPEI12, SPEI8, SPEI24,
       SPEI32, SDAT]])[0]
    return render_template('index.html' , **locals())


if __name__ == '__main__' :
    app.run(debug=True)