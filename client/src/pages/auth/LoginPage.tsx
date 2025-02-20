import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/form/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toaster';
import { formStyles } from '@/constants/styles';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { FirebaseError } from 'firebase/app';

export function LoginPage() {
    const { t } = useTranslation();
    const location = useLocation();
    const { login } = useAuth();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Define validation schema using Zod with i18n keys
    const loginSchema = z.object({
        email: z
            .string()
            .min(1, { message: 'auth.errors.emailRequired' })
            .email({ message: 'auth.errors.emailInvalid' }),
        password: z
            .string()
            .min(1, { message: 'auth.errors.passwordRequired' }),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // Handle registration success message and email pre-fill
    useEffect(() => {
        if (location.state?.message) {
            showToast(t(location.state.message), 'success');
            if (location.state.email) {
                setValue('email', location.state.email);
            }
        }
    }, [location.state, showToast, t, setValue]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            await login(data.email, data.password);
            showToast(t('auth.success.login'), 'success');
            // Redirigir a home después del login
            window.location.href = '/';
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorKey = getFirebaseErrorKey(error.code);
                console.log('Mapped error key:', errorKey);
                showToast(t(errorKey), 'error');
            } else {
                showToast(t('auth.errors.default'), 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to map Firebase error codes to i18n keys
    function getFirebaseErrorKey(errorCode: string): string {
        const errorMap: Record<string, string> = {
            'auth/invalid-login-credentials': 'auth.errors.invalidCredentials',
            'auth/invalid-email': 'auth.errors.emailInvalid',
            'auth/user-disabled': 'auth.errors.userDisabled',
            'auth/user-not-found': 'auth.errors.invalidCredentials',
            'auth/wrong-password': 'auth.errors.invalidCredentials',
            'auth/too-many-requests': 'auth.errors.tooManyRequests',
            'auth/network-request-failed': 'auth.errors.networkError',
            'auth/internal-error': 'auth.errors.default'
        };

        console.log('Firebase error code:', errorCode);
        return errorMap[errorCode] || 'auth.errors.default';
    }

    return (
        <AuthLayout>
            <Card className="
                w-full max-w-md 
                backdrop-blur-sm 
                bg-card/95
                dark:bg-slate-900/90 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                border
                border-slate-200/50
                dark:border-slate-800/50
                rounded-xl
                hover:shadow-[0_8px_35px_rgb(0,0,0,0.06)]
                dark:hover:shadow-[0_8px_35px_rgb(0,0,0,0.16)]
                transition-shadow
                duration-300
            ">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl font-bold text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            {t('auth.login')}
                        </span>
                    </CardTitle>
                    <p className="text-center text-muted-foreground">
                        {t('auth.loginDescription')}
                    </p>
                </CardHeader>
                <CardContent>
                    <form className={`${formStyles.container} space-y-4`} onSubmit={handleSubmit(onSubmit)}>
                        <div className={formStyles.group}>
                            <Input
                                type="email"
                                label={t('auth.email')}
                                placeholder={t('auth.emailPlaceholder')}
                                error={errors.email ? t(errors.email.message!) : undefined}
                                {...register('email')}
                                disabled={isLoading}
                                className="bg-background/50 backdrop-blur-sm transition-colors duration-200"
                            />
                        </div>

                        <div className={formStyles.group}>
                            <Input
                                type="password"
                                label={t('auth.password')}
                                placeholder={t('auth.passwordPlaceholder')}
                                error={errors.password ? t(errors.password.message!) : undefined}
                                {...register('password')}
                                disabled={isLoading}
                                className="bg-background/50 backdrop-blur-sm transition-colors duration-200"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin">⚪</span>
                                    <span>{t('auth.loading.login')}</span>
                                </span>
                            ) : (
                                t('auth.signIn')
                            )}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t dark:border-slate-700 light:border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card dark:bg-slate-900 px-2 text-muted-foreground">
                                    {t('auth.or')}
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                {t('auth.noAccount')}{' '}
                                <Link
                                    to="/register"
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    {t('auth.signUp')}
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
} 