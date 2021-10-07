import pandas
import openpyxl

FILENAME = 'excel-files/ukbusinessworkbook2021.xlsx'
SAMPLE_SHEET = 'Table 1'

wb = openpyxl.load_workbook(FILENAME)

wb.worksheets
x = wb['pls']

df: pandas.DataFrame = pandas.read_excel(
    FILENAME,
    sheet_name=SAMPLE_SHEET,
    header=5,
    index_col=[0, 1]
)

print(df.columns)
print(df.index.shape)