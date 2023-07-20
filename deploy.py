from flask import Flask, render_template, request
import pickle
import sklearn
import pandas as pd
app = Flask(__name__)

model = pickle.load(open('classification_model.sav' , 'rb'))

@app.route('/')
def home():
    result = ''
    return render_template('App.jsx', **locals())

def your_prediction_function(input_data):
    # Replace this with your actual prediction logic using your model
    prediction = model.predict([input_data])[0]
    return prediction

@app.route('/predict')
def predict():
    input_data = request.json
    prediction_result = your_prediction_function(input_data)
    # return jsonify({'prediction': prediction_result})
    return 'jkgkkk'

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['csv_file']
        specific_year = int(request.form['specific_year'])  # Get the specific year input by the user
        
        if file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
    
            filtered_df = df[df['annee'] == specific_year]
    
            # Apply ML model to each row and make predictions
            predictions = []
            t_mins=[]
            t_maxs=[]
            t=[]


            for index, row in filtered_df.iterrows():
                t_mins.append(row['Tmin'])
                t_maxs.append(row['Tmax'])
                t.append(row['T'])



                # Extract the features from the row
                latitude = row['latitude']
                longitude = row['longitude']
                annee = row['annee']
                mois = row['mois']
                P = row['P']
                T = row['T']
                Tmax=row['Tmax']
                Tmin=row['Tmin']
                PET=row['PET']
                qm=row['qm 2089/53 m3/s']
                SPI3=row['SPI3']
                SPI6=row['SPI6']
                SPI9=row['SPI9']
                SPI12=row['SPI12']
                SPI8=row['SPI8']
                SP24=row['SP24']
                SP32=row['SP32']
                SPI3=row['SPI3']
                SPEI3=row['SPEI3']
                SPEI6=row['SPEI6']
                SPEI9=row['SPEI9']
                SPEI12=row['SPEI12']
                SPEI8=row['SPEI8']
                SPEI24=row['SPEI24']
                SPEI32=row['SPEI32']
                SDAT=row['3976_SDAT']

                # Extract other features as needed
                
                # Apply your ML model to make predictions
                prediction =model.predict([[latitude, longitude, annee, mois, P, T, Tmax, Tmin,
                PET, qm, SPI3, SPI6, SPI9, SPI12, SPI8,
                SP24, SP32, SPEI3, SPEI6, SPEI9, SPEI12, SPEI8, SPEI24,
                SPEI32, SDAT]])[0]
                
                # Append the prediction to the list
                predictions.append(prediction)
    
            # Print the predictions
            for i in t_maxs:
                print(i)

            
            
    
            # Return a response or redirect to another page
            return "File uploaded and processed successfully!"
        else:
            return "Please upload an Excel (.xlsx) file."

    return render_template('classif.html')




if __name__ == '__main__' :
    app.run(debug=True)