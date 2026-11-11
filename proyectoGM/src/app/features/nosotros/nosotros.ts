import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-nosotros',
  imports: [Navbar, Banner, Footer],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss',
})
export class NosotrosComponent {}
