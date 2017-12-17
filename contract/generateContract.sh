#!/bin/sh

NAME="agreement"

solc --abi $NAME".sol" | tail -n +4 > $NAME".json"
solc --bin $NAME".sol" | tail -n +4 > $NAME".bin"


