# app.py
from flask import Flask, render_template, request, jsonify,send_file
import pickle
import sklearn
import xlsxwriter
import io
import json
import numpy as np  # Import the numpy library for array operations

app = Flask(__name__)

model = pickle.load(open('classif_model.sav', 'rb'))
regr_model = pickle.load(open('model.sav', 'rb'))
# qm_model=pickle.load(open('reg_model.sav', 'rb'))


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, np.float32):
            return float(o)  # Convert np.float32 to Python float
        return super().default(o)

@app.route('/')
def home():
    result = ''
    return render_template('App.jsx', **locals())


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    inputs = [
        data['latitude'], data['longitude'], data['annee'], data['mois'], data['P'], data['T'],
        data['Tmax'], data['Tmin'], data['PET'], data['SPI3'], data['SPI6'], data['SPI9'],
        data['SPI12'], data['SPI8'], data['SP24'], data['SP32'], data['SPEI3'], data['SPEI6'],
        data['SPEI9'], data['SPEI12'], data['SPEI8'], data['SPEI24'], data['SPEI32']
    ]
    inputs_list = np.array(inputs).astype(np.float32).tolist()

    # Faire la prédiction
    predicted_class = model.predict([inputs_list])[0]
    
    response = {'predicted_class': predicted_class}
    return jsonify(response)


@app.route('/regr', methods=['POST'])
def predict_regr():
    data = request.get_json()
    inputs = [
        data['latitude'], data['longitude'], data['annee'], data['mois'], data['P'], data['T'],
        data['Tmax'], data['Tmin'], data['PET'], data['SPI3'], data['SPI6'], data['SPI9'],
        data['SPI12'], data['SPI8'], data['SP24'], data['SP32'], data['SPEI3'], data['SPEI6'],
        data['SPEI9'], data['SPEI12'], data['SPEI8'], data['SPEI24'], data['SPEI32']
    ]
    prediction= regr_model.predict([inputs])[0] # Convert to int
    # return jsonify(prediction)
    return jsonify(prediction)

# @app.route('/qm', methods=['POST'])
# def predict_qm():
#     data = request.get_json()
#     inputs = [
#         data['latitude'], data['longitude'], data['annee'], data['mois'], data['P'], data['T'],
#         data['Tmax'], data['Tmin'], data['PET'], data['P766i'], data['SPI3'], data['SPI6'], data['SPI9'],
#         data['SPI12'], data['SPI8'], data['SP24'], data['SP32'], data['SPEI3'], data['SPEI6'],
#         data['SPEI9'], data['SPEI12'], data['SPEI8'], data['SPEI24'], data['SPEI32'],data['P766_SDAT']
#     ]
#     prediction= qm_model.predict([inputs])[0] # Convert to int
#     return jsonify(prediction)





@app.route('/download_excel', methods=['GET'])
def download_excel():
    output = io.BytesIO()

    workbook = xlsxwriter.Workbook(output, {'in_memory': True})
    worksheet = workbook.add_worksheet()

    # Write the header row
    header = ['Latitude', 'Longitude', 'Année', 'Mois', 'P', 'T', 'Tmax', 'Tmin', 'PET', 'P766i', 'SPI3', 'SPI6', 'SPI9', 'SPI12', 'SPI8', 'SP24', 'SP32', 'SPEI3', 'SPEI6', 'SPEI9', 'SPEI12', 'SPEI8', 'SPEI24', 'SPEI32', 'P766_SDAT', 'Qm', 'SDAT']
    worksheet.write_row(0, 0, header)

    # Write the data rows
    for row_num, item in enumerate(tableQmData):
        row_data = [
            item['latitude'], item['longitude'], item['annee'], item['mois'], item['P'], item['T'],
            item['Tmax'], item['Tmin'], item['PET'], item['P766i'], item['SPI3'], item['SPI6'],
            item['SPI9'], item['SPI12'], item['SPI8'], item['SP24'], item['SP32'], item['SPEI3'],
            item['SPEI6'], item['SPEI9'], item['SPEI12'], item['SPEI8'], item['SPEI24'],
            item['SPEI32'], item['P766_SDAT'], tableQmResponses[row_num], tableResponses[row_num]
        ]
        worksheet.write_row(row_num + 1, 0, row_data)

    workbook.close()

    output.seek(0)
    return send_file(output, attachment_filename='data.xlsx', as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)