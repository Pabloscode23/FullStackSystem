import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/form/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { formStyles } from '@/constants/styles';

export function LoginPage() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();

    // Define validation schema using Zod with i18n keys
    const loginSchema = z.object({
        email: z.string()
            .min(1, { message: 'auth.errors.emailRequired' })
            .email({ message: 'auth.errors.emailInvalid' }),
        password: z.string()
            .min(1, { message: 'auth.errors.passwordRequired' })
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email, data.password);
            navigate('/');
        } catch (error: unknown) {
            setError('root', {
                message: 'auth.errors.invalidCredentials'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-md backdrop-blur-sm bg-card dark:bg-slate-900/90 shadow-xl dark:shadow-slate-900/10 border-2 dark:border-slate-800 light:border-slate-200 rounded-xl">
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
                                className="bg-background/50 backdrop-blur-sm transition-colors duration-200"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Link
                                to="/reset-password"
                                className="text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                                {t('auth.forgotPassword')}
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center space-x-2">
                                    <span className="animate-spin">⚪</span>
                                    <span>{t('auth.loading')}</span>
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
                                <Link to="/register" className="text-primary hover:text-primary/80 transition-colors">
                                    {t('auth.signUp')}
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 text-center text-sm text-muted-foreground/80 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                            <p className="font-medium mb-1">{t('auth.demoCredentialsTitle')}</p>
                            <p>{t('auth.demoCredentialsEmail')}</p>
                            <p>{t('auth.demoCredentialsPassword')}</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 