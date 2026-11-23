
import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

interface Desarrollador {
    nombre: string;
    foto: string;
    programas: string[];
    lenguajes: string[];
    habilidades: string[];
    cv: string;
}

@Component({
    selector: 'app-desarrolladores',
    standalone: true,
    imports: [Header, Footer],
    templateUrl: './desarrolladores.component.html',
    styleUrl: './desarrolladores.component.scss'
})
export class DesarrolladoresComponent {

    desarrolladores: Desarrollador[] = [

        // INTEGRANTE 1: ARIANA
        {
            nombre: 'Ariana Fiorella Lazaro Maza',
            foto: '/image/desarrolladores/ari.jpg',
            programas: [
                'Visual Studio Code',
                'Power BI (intermedio)',
                'Cisco Packet Tracer'
            ],
            lenguajes: [
                'Python (básico)',
                'Java',
                'JavaScript',
                'SQL'
            ],
            habilidades: [
                'Responsabilidad y compromiso',
                'Organización y planificación',
                'Trabajo en equipo',
                'Adaptabilidad',
                'Comunicación efectiva'
            ],
            cv: '/documentos/cv/ari.pdf'
        },

        // INTEGRANTE 2: GABRIEL
        {
            nombre: 'Gabriel Antonio Mayanga Cabrera',
            foto: '/image/desarrolladores/gabriel.png.png',
            programas: [
                'MySQL',
                'PgAdmin',
                'Supabase',
                'Angular'
            ],
            lenguajes: [
                'Java',
                'JavaScript',
                'SQL',
                'HTML',
                'CSS'
            ],
            habilidades: [
                'Trabajo en equipo',
                'Flexibilidad',
                'Dinamismo',
                'Adaptabilidad',
                'Comunicación asertiva'
            ],
            cv: '/documentos/cv/gabriel.pdf'
        },

        // INTEGRANTE 3: CRISTHIAN
        {
            nombre: 'Cristhian Branthon Rios Hualpa',
            foto: '/image/desarrolladores/cristhian.jpg.jpeg',
            programas: [
                'Visual Studio Code',
                'MySQL Workbench',
                'Apache NetBeans',
                'Angular',
                'React',
                'Spring Boot',
                'Node.js',
                'Express',
                'Git y GitHub'
            ],
            lenguajes: [
                'Java',
                'JavaScript',
                'SQL',
                'HTML5',
                'CSS3'
            ],
            habilidades: [
                'Trabajo en equipo',
                'Comunicación efectiva',
                'Liderazgo',
                'Organización',
                'Resolución de problemas y adaptabilidad'
            ],
            cv: '/documentos/cv/cristhian.pdf'
        },

        // INTEGRANTE 4: ABEL
        {
            nombre: 'Abel Moises Mucha Arteta',
            foto: '/image/desarrolladores/abel.png',
            programas: [
                'React',
                'Next.js',
                'Spring Web JPA'
            ],
            lenguajes: [
                'JavaScript'
            ],
            habilidades: [
                'Resolución de problemas',
                'Manejo de software',
                'Disciplina'
            ],
            cv: '/documentos/cv/abel.pdf'
        }

    ];

}

