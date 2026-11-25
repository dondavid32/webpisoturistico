"""Descarga a img/rutas/ las fotos de las páginas de rutas (ahora enlazadas
desde el servidor de imágenes de la web original) y cambia las rutas en los
HTML para que la web no dependa de ese servidor.

Uso, desde esta carpeta:  python descargar-fotos.py
"""
import glob
import os
import re
import urllib.request

PATRON = re.compile(r'https://res\.cloudinary\.com/amenitiz/image/upload/([^/"]+)/(v\d+)/([\w-]+\.\w+)')
DESTINO = os.path.join("img", "rutas")


def descargar(url, ruta):
    peticion = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(peticion, timeout=30) as resp, open(ruta, "wb") as f:
        f.write(resp.read())


def main():
    os.makedirs(DESTINO, exist_ok=True)
    hechas = {}
    for pagina in sorted(glob.glob("*.html")):
        with open(pagina, encoding="utf-8") as f:
            html = f.read()
        cambiado = html
        for m in PATRON.finditer(html):
            url, opciones, version, nombre = m.group(0), m.group(1), m.group(2), m.group(3)
            if url not in hechas:
                ruta = os.path.join(DESTINO, nombre)
                # sin "f_auto" para que el formato coincida con la extensión del archivo
                origen = url.replace(opciones, opciones.replace("f_auto,", ""))
                try:
                    if not os.path.exists(ruta):
                        descargar(origen, ruta)
                        print("descargada", nombre)
                    hechas[url] = "img/rutas/" + nombre
                except Exception as error:  # se deja el enlace original si falla
                    print("ERROR", nombre, error)
                    hechas[url] = None
            if hechas[url]:
                cambiado = cambiado.replace(url, hechas[url])
        if cambiado != html:
            with open(pagina, "w", encoding="utf-8") as f:
                f.write(cambiado)
            print("actualizada", pagina)


if __name__ == "__main__":
    main()
