#!/usr/bin/env python3
import json, subprocess, os
os.environ['PATH'] = '/root/.nvm/versions/node/v22.22.1/bin:' + os.environ.get('PATH','')
os.environ['CLOUDFLARE_API_TOKEN'] = json.load(open('/root/.wrangler/config.json'))['api_token']
cwd = '/root/projects/ilaw-lesson-plan-generator/07-frontend'
secrets = [
    ('PAYPAL_CLIENT_ID', 'AUKlxGFx6cCu1dc_NpRDO5-m3Erj8DEYsT8c_9WKUgO9aMnYCq1JyITbzk0aZEX2scfnU52T5fqcXsab'),
    ('PAYPAL_CLIENT_SECRET', 'EIo2NpF5eQ0N0p4l5DGr1OTKRnwfP3PuxAskhIjQ1w3m8g2q6jyTsWnkbaarfBy28wxNrA9Ve_Jn7cuh'),
    ('PAYPAL_MODE', 'sandbox'),
]
for name, value in secrets:
    r = subprocess.run(
        ['npx', 'wrangler', 'pages', 'secret', 'put', name],
        input=value.encode(), capture_output=True, timeout=60, cwd=cwd,
        env=os.environ
    )
    print(f'{name}: {"OK" if r.returncode==0 else "FAIL"}')
    if r.returncode != 0:
        print(r.stdout.decode()[:200])
        print(r.stderr.decode()[:200])
print("Done")
