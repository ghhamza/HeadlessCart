from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Table, Text, text, func
from passlib.context import CryptContext
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class CommonModel(Base):
    __abstract__ = True

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False, onupdate=func.now())


class Team(CommonModel):
    __tablename__ = 'teams'

    name = Column(String(255), nullable=False)
    users = relationship("User", back_populates="team")


class User(CommonModel):
    __tablename__ = "users"

    username = Column(String(255), nullable=False, unique=True, index=True)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    team_id = Column(Integer, ForeignKey('teams.id', ondelete='CASCADE'))
    team = relationship("Team", back_populates="users")
    roles = relationship("Role", secondary='user_roles', back_populates="users")


class Role(CommonModel):
    __tablename__ = 'roles'
    name = Column(String(255), nullable=False, unique=True)
    users = relationship("User", secondary='user_roles', back_populates="roles")


user_roles = Table(
    'user_roles', Base.metadata,
    Column('user_id', ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    Column('role_id', ForeignKey('roles.id', ondelete='CASCADE'), primary_key=True)
)


class Category(CommonModel):
    __tablename__ = 'categories'

    parent_id = Column(ForeignKey('categories.id'))
    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    icon = Column(Text, nullable=True)
    image = Column(Text, nullable=True)
    placeholder = Column(Text, nullable=True)
    active = Column(Boolean, nullable=False, server_default=text("true"))

    parent = relationship('Category', remote_side=[id])


class Tag(CommonModel):
    __tablename__ = 'tags'

    name = Column(String(255), nullable=False)
    icon = Column(Text, nullable=True)


class Attribute(CommonModel):
    __tablename__ = 'attributes'

    name = Column(String(255), nullable=False)


class AttributeValue(CommonModel):
    __tablename__ = 'attribute_values'

    attribute_id = Column(ForeignKey('attributes.id', ondelete='CASCADE'), nullable=False)
    value = Column(String(255), nullable=False)

    attribute = relationship('Attribute')
    variants = relationship('Variant', secondary='variant_attribute_value', back_populates="attribute_values")
    products = relationship('Product', secondary='product_attribute_value', back_populates="attribute_values")


class Product(CommonModel):
    __tablename__ = 'products'

    category_id = Column(ForeignKey('categories.id', ondelete='CASCADE'), nullable=False)
    description = Column(Text, nullable=False)
    short_description = Column(String(165), nullable=False)
    type = Column(String(64), nullable=False)  # Big type top of category (@todo)
    name = Column(String(255), nullable=False)
    sku = Column(String(255), nullable=True, unique=True)
    sale_price = Column(Numeric, nullable=False, server_default=text("0"))
    compare_price = Column(Numeric, nullable=False, server_default=text("0"))
    buying_price = Column(Numeric, nullable=True)
    quantity = Column(Integer, nullable=False, server_default=text("0"))
    published = Column(Boolean, nullable=False, index=True, server_default=text("false"))
    disable_out_of_stock = Column(Boolean, nullable=False, server_default=text("true"))

    tags = relationship('Tag', secondary='product_tags')
    category = relationship('Category')
    features = relationship('Feature', secondary='product_feature', back_populates="products")
    attribute_values = relationship('AttributeValue', secondary='product_attribute_value', back_populates="products")


product_attribute_value = Table(
    'product_attribute_value', Base.metadata,
    Column('product_id', ForeignKey('products.id', ondelete='CASCADE'), primary_key=True),
    Column('attribute_value_id', ForeignKey('attribute_values.id', ondelete='CASCADE'), primary_key=True)
)


class Feature(CommonModel):
    """
    The Feature model represents distinctive characteristics or properties of a product
    that don't necessarily have values, and don't fit the attribute-value paradigm.
    Unlike attributes, features stand on their own and convey information by their mere presence.
    For example, features could include aspects like "Environmentally Friendly", "Handmade",
    "Free Shipping", "Locally Sourced", etc. These are aspects of a product that
    customers might find valuable and that could influence their purchase decision,
    but they aren't attributes in the traditional sense because they don't have values.
    The relationship between products and features is many-to-many, meaning a product
    can have multiple features and a feature can be associated with multiple products.
    """
    __tablename__ = 'features'

    name = Column(String(255), nullable=False)
    products = relationship('Product', secondary='product_feature', back_populates="features")


product_feature = Table(
    'product_feature', Base.metadata,
    Column('product_id', ForeignKey('products.id', ondelete='CASCADE'), primary_key=True),
    Column('feature_id', ForeignKey('features.id', ondelete='CASCADE'), primary_key=True)
)


class Variant(CommonModel):
    __tablename__ = 'variants'

    title = Column(Text, nullable=False)
    product_id = Column(ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    sale_price = Column(Numeric, nullable=False, server_default=text("0"))
    compare_price = Column(Numeric, nullable=False, server_default=text("0"))
    buying_price = Column(Numeric, nullable=True)
    quantity = Column(Integer, nullable=False, server_default=text("0"))
    sku = Column(String(255), nullable=False, unique=True)
    active = Column(Boolean, nullable=False, server_default=text("true"))

    product = relationship('Product')
    attribute_values = relationship('AttributeValue', secondary='variant_attribute_value', back_populates="variants")


variant_attribute_value = Table(
    'variant_attribute_value', Base.metadata,
    Column('variant_id', ForeignKey('variants.id', ondelete='CASCADE'), primary_key=True),
    Column('attribute_value_id', ForeignKey('attribute_values.id', ondelete='CASCADE'), primary_key=True)
)
