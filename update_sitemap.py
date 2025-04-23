import os
import time
from datetime import datetime
import xml.etree.ElementTree as ET
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class SitemapUpdater(FileSystemEventHandler):
    def __init__(self, sitemap_path):
        self.sitemap_path = sitemap_path
        self.last_update = datetime.now().strftime('%Y-%m-%d')

    def update_sitemap(self):
        try:
            # Parsear el sitemap
            tree = ET.parse(self.sitemap_path)
            root = tree.getroot()
            
            # Actualizar todas las fechas lastmod
            for url in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
                lastmod = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod')
                if lastmod is not None:
                    lastmod.text = self.last_update
            
            # Guardar los cambios
            tree.write(self.sitemap_path, encoding='UTF-8', xml_declaration=True)
            print(f"Sitemap actualizado con fecha: {self.last_update}")
        except Exception as e:
            print(f"Error al actualizar el sitemap: {e}")

    def on_modified(self, event):
        if event.src_path.endswith('.html'):
            self.last_update = datetime.now().strftime('%Y-%m-%d')
            self.update_sitemap()

def main():
    # Ruta al sitemap.xml
    sitemap_path = 'sitemap.xml'
    
    # Crear el observador
    event_handler = SitemapUpdater(sitemap_path)
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=True)
    observer.start()

    try:
        print("Monitoreando cambios en archivos HTML...")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\nMonitoreo detenido.")
    observer.join()

if __name__ == "__main__":
    main() 