// import crypto from 'crypto';
import User from '../models/userModel.js';
import { sendPasswordResetEmail } from '../services/email.services.js';

// Solicitud de reseteo de clave: solicitar token y enviar email
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('No existe un usuario registrado con este email');
        }

        // Genera un token de 6 caracteres numericos
        const resetToken = Math.floor(100000 + Math.random() * 900000);
        user.passwordResetToken = resetToken.toString();
        user.passwordResetExpires = Date.now() + 300000; // 5 minutes
        await user.save();

        // Enviar email
        await sendPasswordResetEmail(user.email, resetToken);

        res.status(200).send('Email de recuperacion de clave enviado');
    } catch (error) {
        res.status(500).send('Error procesando la solicitud');
    }
};

// Validar token y setear la nueva contrasena
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() },
        });

        console.log(user)
        if (!user) {
            return res.status(400).send('Token invalido o expirado');
        }

        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).send('La clave ha sido reseteada');
    } catch (error) {
        res.status(500).send('Error reseteando la clave');
    }
};
