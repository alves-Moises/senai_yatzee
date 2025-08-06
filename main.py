import os
try:
    os.system("ifconfig")
except:
    os.system("ipconfig")
else:
    os.system("npx json-server ./database/db.json")
