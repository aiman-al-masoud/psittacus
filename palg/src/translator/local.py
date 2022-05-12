from .translator import Translator
import argostranslate.package, argostranslate.translate


class LocalTranslator(Translator):
    
    lang_to_code = {'afrikaans': 'af', 'albanian': 'sq', 'arabic': 'ar', 'armenian': 'hy', 'azerbaijani': 'az', 'basque': 'eu', 'belarusian': 'be', 'bulgarian': 'bg', 'catalan': 'ca', 'chinese (simplified)': 'zh-cn', 'chinese (traditional)': 'zh-tw', 'croatian': 'hr', 'czech': 'cs', 'danish': 'da', 'dutch': 'nl', 'english': 'en', 'estonian': 'et', 'filipino': 'tl', 'finnish': 'fi', 'french': 'fr', 'galician': 'gl', 'georgian': 'ka', 'german': 'de', 'greek': 'el', 'haitian creole': 'ht', 'hebrew': 'iw', 'hindi': 'hi', 'hungarian': 'hu', 'icelandic': 'is', 'indonesian': 'id', 'irish': 'ga', 'italian': 'it', 'japanese': 'ja', 'korean': 'ko', 'latvian': 'lv', 'lithuanian': 'lt', 'macedonian': 'mk', 'malay': 'ms', 'maltese': 'mt', 'norwegian': 'no', 'persian': 'fa', 'polish': 'pl', 'portuguese': 'pt', 'romanian': 'ro', 'russian': 'ru', 'serbian': 'sr', 'slovak': 'sk', 'slovenian': 'sl', 'spanish': 'es', 'swahili': 'sw', 'swedish': 'sv', 'thai': 'th', 'turkish': 'tr', 'ukrainian': 'uk', 'urdu': 'ur', 'vietnamese': 'vi', 'welsh': 'cy', 'yiddish': 'yi'}

    def __init__(self, language_one, language_two):
        
        from_code = LocalTranslator.lang_to_code[language_one]
        to_code = LocalTranslator.lang_to_code[language_two]

        # Download and install Argos Translate package
        available_packages = argostranslate.package.get_available_packages()


        # print(available_packages)

        available_package = list(filter(lambda x: x.from_code == from_code and x.to_code == to_code, available_packages))[0]

        # print(available_package)

        # download_path = available_package.download()
        # print(download_path)

        # download_path = "/home/aiman/.local/cache/argos-translate/downloads/translate-it_en.argosmodel"
        
        download_path = f"/home/aiman/.local/cache/argos-translate/downloads/translate-{from_code}_{to_code}.argosmodel"

        print(download_path)

        # print(download_path, "download path")
        argostranslate.package.install_from_path(download_path)
        print("done installing from file")

        # Translate
        installed_languages = argostranslate.translate.get_installed_languages()

        # print(installed_languages)

        from_lang = list(filter(lambda x: x.code == from_code, installed_languages))[0]
        to_lang = list(filter(lambda x: x.code == to_code, installed_languages))[0]
        
        self.translation = from_lang.get_translation(to_lang)

    
    def translate(self, sentences):
        return [(s, self.translation.translate(s)) for s in sentences]


