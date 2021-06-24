"""add relation with items

Revision ID: bce8fed5d0ee
Revises: ca7f379e1058
Create Date: 2022-02-02 22:31:32.469641

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bce8fed5d0ee'
down_revision = 'ca7f379e1058'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('item', sa.Column('station_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'item', 'station', ['station_id'], ['id'], ondelete='SET NULL')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'item', type_='foreignkey')
    op.drop_column('item', 'station_id')
    # ### end Alembic commands ###
