#!/bin/sh

find app/ -type d -name __pycache__ -exec rm -r {} +
python3 manage.py