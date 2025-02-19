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

const schema = z.object({
    username: z.string()
        .min(3, 'auth.errors.usernameTooShort')
        .max(20, 'auth.errors.usernameTooLong'),
    email: z.string()
        .email('auth.errors.invalidEmail'),
    password: z.string()
        .min(8, 'auth.errors.passwordTooShort')
        .regex(/[A-Z]/, 'auth.errors.passwordUppercase')
        .regex(/[a-z]/, 'auth.errors.passwordLowercase')
        .regex(/[0-9]/, 'auth.errors.passwordNumber'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "auth.errors.passwordsDontMatch",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof schema>;

export function RegisterPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data.email, data.password, data.username);
            navigate('/login');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            console.error('Registration error:', errorMessage);
            setError('root', {
                message: 'auth.errors.registrationFailed'
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

            <Card className={`
        w-full max-w-md 
        backdrop-blur-sm 
        bg-card 
        dark:bg-slate-900/90 
        shadow-xl
        dark:shadow-slate-900/10
        border-2
        dark:border-slate-800
        light:border-slate-200
        rounded-xl
      `}>
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl font-bold text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            {t('auth.register')}
                        </span>
                    </CardTitle>
                    <p className="text-center text-muted-foreground">
                        {t('auth.registerDescription')}
                    </p>
                </CardHeader>
                <CardContent>
                    <form className={`${formStyles.container} space-y-4`} onSubmit={handleSubmit(onSubmit)}>
                        <div className={formStyles.group}>
                            <Input
                                type="text"
                                label={t('auth.username')}
                                placeholder={t('auth.usernamePlaceholder')}
                                error={errors.username ? t(errors.username.message!) : undefined}
                                {...register('username')}
                                disabled={isSubmitting}
                                className="bg-background/50 backdrop-blur-sm transition-colors duration-200"
                            />
                        </div>

                        <div className={formStyles.group}>
                            <Input
                                type="email"
                                label={t('auth.email')}
                                placeholder="demo@example.com"
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

                        <div className={formStyles.group}>
                            <Input
                                type="password"
                                label={t('auth.confirmPassword')}
                                placeholder={t('auth.confirmPasswordPlaceholder')}
                                error={errors.confirmPassword ? t(errors.confirmPassword.message!) : undefined}
                                {...register('confirmPassword')}
                                disabled={isSubmitting}
                                className="bg-background/50 backdrop-blur-sm transition-colors duration-200"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center space-x-2">
                                    <span className="animate-spin">⚪</span>
                                    <span>{t('common.loading')}</span>
                                </span>
                            ) : (
                                t('auth.signUp')
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
                                {t('auth.haveAccount')}{' '}
                                <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
                                    {t('auth.signIn')}
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 text-center text-sm text-muted-foreground/80 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                            {t('auth.passwordRequirements')}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 