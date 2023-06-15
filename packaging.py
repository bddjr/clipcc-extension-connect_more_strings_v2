import json, os, platform
conf = json.load( open('./code/info.json') )
if platform.system() == 'Windows':
    os.system('bandizip a ' + conf['id'] + '@' + conf['version'] + '.ccx ./code')
else:
    os.system('zip -q -r ' + conf['id'] + '@' + conf['version'] + '.ccx ./code')
