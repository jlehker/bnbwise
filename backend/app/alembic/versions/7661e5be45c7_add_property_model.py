"""Add property model

Revision ID: 7661e5be45c7
Revises: 1137e8ddf1d8
Create Date: 2021-10-13 22:27:52.382216

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7661e5be45c7'
down_revision = '1137e8ddf1d8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('property',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_property_description'), 'property', ['description'], unique=False)
    op.create_index(op.f('ix_property_id'), 'property', ['id'], unique=False)
    op.create_index(op.f('ix_property_title'), 'property', ['title'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_property_title'), table_name='property')
    op.drop_index(op.f('ix_property_id'), table_name='property')
    op.drop_index(op.f('ix_property_description'), table_name='property')
    op.drop_table('property')
    # ### end Alembic commands ###
