import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Register() {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{t('auth.register')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t('auth.username')}</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                placeholder={t('auth.usernamePlaceholder')}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-md"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t('auth.password')}</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded-md"
                                placeholder={t('auth.passwordPlaceholder')}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t('auth.confirmPassword')}</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded-md"
                                placeholder={t('auth.confirmPasswordPlaceholder')}
                            />
                        </div>
                        <Button className="w-full">{t('auth.signUp')}</Button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-foreground/70">
                            {t('auth.haveAccount')}{' '}
                            <Link to="/login" className="text-primary hover:underline">
                                {t('auth.signIn')}
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 