from flask import Flask, render_template, request
import pickle
import sklearn
import pandas as pd
app = Flask(__name__)

model = pickle.load(open('regression_model.sav' , 'rb'))

@app.route('/')
def home():
    result = ''
    return render_template('classif.html', **locals())


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


from flask import Flask, render_template, request

app = Flask(__name__)

from flask import request

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