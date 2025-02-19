import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-foreground/80">
                        {t('footer.rights')}
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-foreground/80 hover:text-foreground">
                            {t('footer.privacy')}
                        </a>
                        <a href="#" className="text-foreground/80 hover:text-foreground">
                            {t('footer.terms')}
                        </a>
                        <a href="#" className="text-foreground/80 hover:text-foreground">
                            {t('footer.contact')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
} 