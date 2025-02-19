import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/form/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

// Define validation schema using Zod
// This schema will ensure that the form data meets our requirements
const loginSchema = z.object({
    email: z.string()
        .min(1, { message: 'auth.errors.emailRequired' }) // Email cannot be empty
        .email({ message: 'auth.errors.emailInvalid' }), // Must be a valid email format
    password: z.string()
        .min(1, { message: 'auth.errors.passwordRequired' }) // Password cannot be empty
});

// Create a TypeScript type from our schema
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
    // Initialize hooks
    const { t } = useTranslation(); // For internationalization
    const { login } = useAuth(); // For authentication
    const navigate = useNavigate(); // For navigation after login

    // Initialize react-hook-form with zod resolver
    const {
        register, // Function to register inputs with form
        handleSubmit, // Form submission handler
        formState: { errors, isSubmitting }, // Form state including errors and loading state
        setError, // Function to manually set errors
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Handle form submission
    const onSubmit = async (data: LoginFormData) => {
        try {
            login(data.email, data.password);
            navigate('/'); // Redirect to home page on successful login
        } catch (error) {
            // Set error if login fails
            setError('root', {
                message: 'auth.errors.invalidCredentials'
            });
        }
    };

    return (
        // Center the form on the page
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{t('auth.login')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Login form */}
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email input field */}
                        <Input
                            type="email"
                            label={t('auth.email')}
                            placeholder="demo@example.com"
                            error={errors.email ? t(errors.email.message!) : undefined}
                            {...register('email')}
                            disabled={isSubmitting}
                        />

                        {/* Password input field */}
                        <Input
                            type="password"
                            label={t('auth.password')}
                            placeholder={t('auth.passwordPlaceholder')}
                            error={errors.password ? t(errors.password.message!) : undefined}
                            {...register('password')}
                            disabled={isSubmitting}
                        />

                        {/* Display form-level errors */}
                        {errors.root && (
                            <p className="text-sm text-red-500">
                                {t(errors.root.message!)}
                            </p>
                        )}

                        {/* Forgot password link */}
                        <div className="flex items-center justify-between">
                            <Link
                                to="/reset-password"
                                className="text-sm text-primary hover:underline"
                            >
                                {t('auth.forgotPassword')}
                            </Link>
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t('common.loading') : t('auth.signIn')}
                        </Button>
                    </form>

                    {/* Sign up link */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-foreground/70">
                            {t('auth.noAccount')}{' '}
                            <Link to="/register" className="text-primary hover:underline">
                                {t('auth.signUp')}
                            </Link>
                        </p>
                    </div>

                    {/* Demo credentials */}
                    <div className="mt-4 text-center text-sm text-foreground/70">
                        {t('auth.demoCredentials')}:<br />
                        Email: demo@example.com<br />
                        Password: password
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 