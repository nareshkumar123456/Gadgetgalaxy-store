import urllib.request
urls=[
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
    'https://images.unsplash.com/photo-1517604931442-7b5f1b5667db?w=600&q=80',
    'https://images.unsplash.com/photo-1525186402429-1e27d08e0305?w=600&q=80',
    'https://images.unsplash.com/photo-1531340811179-8418fdfa59f0?w=600&q=80',
    'https://images.unsplash.com/photo-1518449077204-9d819385a5db?w=600&q=80',
    'https://images.unsplash.com/photo-1511511913010-dae14a3efc5d?w=600&q=80'
]
for url in urls:
    try:
        r = urllib.request.urlopen(url, timeout=10)
        print(url, r.status, r.getheader('Content-Type'))
    except Exception as e:
        print(url, 'ERROR', type(e).__name__, e)
