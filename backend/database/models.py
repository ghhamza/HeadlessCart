from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Table, func
from passlib.context import CryptContext
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class CommonModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class Team(Base):
    __tablename__ = 'teams'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    users = relationship("User", back_populates="team")
    sites = relationship("Site", back_populates="team")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    team_id = Column(Integer, ForeignKey('teams.id'))
    team = relationship("Team", back_populates="users")
    roles = relationship("Role", secondary='user_roles', back_populates="users")

    def hash_password(self, password):
        self.hashed_password = pwd_context.hash(password)


class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    users = relationship("User", secondary='user_roles', back_populates="roles")


user_roles = Table(
    'user_roles', Base.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('role_id', ForeignKey('roles.id'), primary_key=True)
)


class Site(CommonModel):
    __tablename__ = 'sites'
    name = Column(String, unique=True)
    description = Column(String)
    container_id = Column(String)
    postgres_container_id = Column(String)
    team_id = Column(Integer, ForeignKey('teams.id'))
    team = relationship("Team", back_populates="sites")
    domains = relationship('SiteDomains', back_populates='site')


class SiteDomains(Base):
    __tablename__ = 'site_domains'
    id = Column(Integer, primary_key=True)
    domain_name = Column(String, unique=True)
    site_id = Column(Integer, ForeignKey('sites.id'))
    site = relationship('Site', back_populates='domains')
