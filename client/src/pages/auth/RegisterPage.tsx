import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FirebaseError } from 'firebase/app';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/form/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toaster';
import { formStyles } from '@/constants/styles';
import { AuthLayout } from '@/components/layout/AuthLayout';

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
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setIsLoading(true);
            await registerUser(data.email, data.password, data.username);
            showToast(t('auth.errors.registerSuccess'), 'success');
            navigate('/login');
        } catch (error) {
            if (error instanceof Error) {
                // Handle specific validation errors
                if (error.message === 'auth.errors.usernameExists') {
                    setError('username', {
                        type: 'manual',
                        message: 'auth.errors.usernameExists'
                    });
                    showToast(t('auth.errors.usernameExists'), 'error');
                }
                else if (error.message === 'auth.errors.emailExists') {
                    setError('email', {
                        type: 'manual',
                        message: 'auth.errors.emailExists'
                    });
                    showToast(t('auth.errors.emailExists'), 'error');
                }
                // Handle Firebase errors
                else if (error instanceof FirebaseError) {
                    showToast(
                        t(`auth.errors.${error.code}`) || t('auth.errors.default'),
                        'error'
                    );
                }
                // Handle other errors
                else {
                    showToast(t('auth.errors.default'), 'error');
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

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
                                error={errors.username && t(errors.username.message!)}
                                {...register('username')}
                                disabled={isLoading}
                                className="bg-background/50 backdrop-blur-sm transition-colors duration-200"
                            />
                        </div>

                        <div className={formStyles.group}>
                            <Input
                                type="email"
                                label={t('auth.email')}
                                placeholder={t('auth.examplePlaceholder')}
                                error={errors.email && t(errors.email.message!)}
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

                        <div className={formStyles.group}>
                            <Input
                                type="password"
                                label={t('auth.confirmPassword')}
                                placeholder={t('auth.confirmPasswordPlaceholder')}
                                error={errors.confirmPassword ? t(errors.confirmPassword.message!) : undefined}
                                {...register('confirmPassword')}
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
                                    <span>{t('auth.loading.register')}</span>
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
                    </form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
} 