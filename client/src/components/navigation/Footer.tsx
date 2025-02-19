import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    CodeBracketIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {/* Left side - Copyright */}
                    <p className="text-sm text-muted-foreground">
                        {t('footer.rights')}
                    </p>

                    {/* Center - Contact */}
                    <a
                        href="mailto:pnavarro0923@gmail.com"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <EnvelopeIcon className="w-4 h-4" />
                        <span>{t('footer.contact')}</span>
                    </a>

                    {/* Right side - GitHub link */}
                    <a
                        href="https://github.com/Pabloscode23/FullStackSystem"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <CodeBracketIcon className="w-4 h-4" />
                        <span>{t('footer.sourceCode')}</span>
                    </a>
                </div>
            </div>
        </footer>
    );
} 