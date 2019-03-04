import os
import shutil

def c(s):
    os.system(s)

shutil.rmtree("dist")

c("parcel build --public-url ./ --no-content-hash gridomancer.html")