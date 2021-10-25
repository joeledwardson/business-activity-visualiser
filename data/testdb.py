import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.sql.schema import Table
from typing import Dict
from sqlalchemy import and_, or_
import sqlalchemy.sql.functions as func

engine = create_engine('sqlite:///businessdatabase2.db')
base = automap_base()
base.prepare(engine, reflect=True)
session = Session(engine)
tables: Dict[str, Table] = base.metadata.tables

print('printing database table names')
for k, v in base.metadata.tables.items():
    print(k)


# for s in session.query(tables['geolookups']).filter(tables['geolookups'].columns['has_children'] == 2):
#     print(s)

tdat = tables['tabledata']
tgeo = tables['geolookups']

levels = 8
totals = {}

print('looping levels checking totals match')
value = None
for level in range(1, levels+1):

    cte = session.query(tdat, tgeo.columns['level'], tgeo.columns['level_end'], tgeo.columns['has_children']).join(
        tgeo, tdat.columns['variable_x'] == tgeo.columns['index']
    ).cte()
    print(f'level {level} cte:\n{cte}')

    q = session.query(cte).filter(
        cte.c['table'] == 1,
        # cte.c['level'] == level
        or_(
            and_(level >= cte.c['level'], level <= cte.c['level_end']),
            and_(level > cte.c['level'], cte.c['has_children'] == 0)
        )
    )
    print(f'level {level} query:\n{q}\n')

    x = session.query(func.sum(q.cte().columns['value'])).all()
    value = x[0][0]
    totals[level] = value
    print(f'level {level}, value rows: {q.count()}, sum: {value}')

assert all(x==value for x in totals.values())